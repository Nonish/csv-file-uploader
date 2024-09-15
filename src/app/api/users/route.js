import pool from "@/app/utils/db";

export async function GET(req, res) {
   if (req.method === 'GET') {
      try {
         const [rows] = await pool.query('SELECT * FROM users');
         res.status(200).json({ users: rows });
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Failed to retrieve users' });
      }
   } else {
      res.status(405).json({ error: 'Method not allowed' });
   }
}