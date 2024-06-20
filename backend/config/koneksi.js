import mysql from 'mysql2/promise';
import 'dotenv/config';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function getItemsData() {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows;
  } catch (error) {
    console.error('Error getting items data:', error);
    throw error;
  }
}

export async function updateItemData(id, updatedItem) {
  try {
    const { batch_number, manufacture_brand, category, current_quantity } = updatedItem;
    const result = await pool.query(
      'UPDATE products SET batch_number = ?, type = ?, manufacture_brand = ?, category = ?, current_quantity = ? WHERE id = ?',
      [batch_number, type, manufacture_brand, category, current_quantity, id]
    );
    return result;
  } catch (error) {
    console.error('Error updating item data:', error);
    throw error;
  }
}

export async function deleteItemData(id) {
  try {
    const result = await pool.query('DELETE FROM products WHERE id = ?', [id]);
    return result;
  } catch (error) {
    console.error('Error deleting item data:', error);
    throw error;
  }
}

export async function insertItemData(newItem) {
  try {
    const { batch_number, manufacture_brand, category, type, current_quantity } = newItem;
    const result = await pool.query(
      'INSERT INTO products (batch_number, manufacture_brand, category, type, current_quantity, initial_quantity, loss_stock, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [batch_number, manufacture_brand, category, type, current_quantity, current_quantity, 0, description ]
    );
    return result;
  } catch (error) {
    console.error('Error inserting item data:', error);
    throw error;
  }
}

export async function getBarangMasukData() {
  try {
    const [rows] = await pool.query(`
      SELECT transactions.*, products.type, products.current_quantity
      FROM transactions
      INNER JOIN products ON transactions.products_id = products.id
      WHERE transactions.transaction_type = 'in'
    `);
    return rows;
  } catch (error) {
    console.error('Error getting barang masuk data:', error);
    throw error;
  }
}

export async function getBarangKeluarData() {
  try {
    const [rows] = await pool.query(`
      SELECT transactions.*, products.type, products.current_quantity
      FROM transactions
      INNER JOIN products ON transactions.products_id = products.id
      WHERE transactions.transaction_type = 'out'
    `);
    return rows;
  } catch (error) {
    console.error('Error getting barang keluar data:', error);
    throw error;
  }
}

export async function getLaporanMasukData() {
  try {
    const [rows] = await pool.query(`
      SELECT transactions.*, products.type, products.batch_number, products.manufacture_brand
      FROM transactions
      INNER JOIN products ON transactions.products_id = products.id
      WHERE transactions.transaction_type = 'in'
    `);
    return rows;
  } catch (error) {
    console.error('Error getting laporan masuk data:', error);
    throw error;
  }
}

export async function getLaporanKeluarData() {
  try {
    const [rows] = await pool.query(`
      SELECT transactions.*, products.type, products.batch_number, products.manufacture_brand
      FROM transactions
      INNER JOIN products ON transactions.products_id = products.id
      WHERE transactions.transaction_type = 'out'
    `);
    return rows;
  } catch (error) {
    console.error('Error getting laporan keluar data:', error);
    throw error;
  }
}

export async function getLaporanData() {
  try {
    const [rows] = await pool.query(`
      SELECT transactions.*, products.type, products.batch_number, products.current_quantity, products.manufacture_brand
      FROM transactions
      INNER JOIN products ON transactions.products_id = products.id
    `);
    return rows;
  } catch (error) {
    console.error('Error getting laporan data:', error);
    throw error;
  }
}

export async function insertBarangMasuk(newTransaction) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const { products_id, amount, project, transaction_date } = newTransaction;
    const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

    console.log('Received data:', newTransaction);

    const [currentQuantity] = await connection.query(
      'SELECT current_quantity FROM products WHERE id = ?',
      [products_id]
    );

    const totalStock = currentQuantity[0].current_quantity + parseInt(amount);

    console.log('Total stock calculated:', totalStock);

    const [insertResult] = await connection.query(
      `INSERT INTO transactions (products_id, project, amount, total_stock, transaction_date, transaction_type, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [products_id, project, amount, totalStock, transaction_date, 'in', currentTimestamp, currentTimestamp]
    );

    console.log('Insert result:', insertResult);

    await connection.query(
      'UPDATE products SET current_quantity = current_quantity + ? WHERE id = ?',
      [amount, products_id]
    );

    await connection.commit();
    return insertResult;
  } catch (error) {
    await connection.rollback();
    console.error('Error inserting barang masuk:', error.message, error.stack);
    throw error;
  } finally {
    connection.release();
  }
}
export async function insertBarangKeluar(newTransaction) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const { products_id, amount, project, transaction_date } = newTransaction;
    const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

    console.log('Received data:', newTransaction);

    const [productData] = await connection.query(
      'SELECT current_quantity, loss_stock FROM products WHERE id = ?',
      [products_id]
    );

    if (productData.length === 0) {
      throw new Error(`Product with id ${products_id} not found`);
    }

    const { current_quantity, loss_stock } = productData[0];
    const totalStock = current_quantity - parseInt(amount);

    if (totalStock < 0) {
      throw new Error(`Insufficient stock for product with id ${products_id}`);
    }

    console.log('Total stock calculated:', totalStock);

    const [insertResult] = await connection.query(
      `INSERT INTO transactions (products_id, amount, project, total_stock, transaction_date, transaction_type, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [products_id, amount, project, totalStock, transaction_date, 'out', currentTimestamp, currentTimestamp]
    );

    console.log('Insert result:', insertResult);

    // Update current_quantity and loss_stock
    await connection.query(
      'UPDATE products SET current_quantity = current_quantity - ?, loss_stock = loss_stock + ? WHERE id = ?',
      [amount, amount, products_id]
    );

    await connection.commit();
    return insertResult;
  } catch (error) {
    await connection.rollback();
    console.error('Error inserting barang keluar:', error.message, error.stack);
    throw error;
  } finally {
    connection.release();
  }
}