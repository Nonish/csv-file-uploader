import path from 'path';
import uploadByMulter from '@/app/utils/multer';
import { csvParser } from '@/app/utils/csvParser';

export const config = {
   api: {
      bodyParser: false, // Disable Next.js's default body parser
   },
};

export async function POST(req, res) {
   if (req.method === 'POST') {
      // Use multer to handle the file upload
      const formData = await req.formData();
      const file = formData.get("file");
      const filename = file.name.replaceAll(" ", "_");
      uploadByMulter.single('file')(req, res, async (err) => {
         if (err) return res.status(500).json({ error: 'Error uploading file' });
         const filePath = path.join(process.cwd(), 'docs', filename);
         await csvParser(filePath, res)
      });
   } else {
      res.status(405).json({ error: 'Method not allowed' });
   }
};