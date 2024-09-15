import path from 'path';
import multer from 'multer';

// export const uploadByMulter = multer({
//    storage: multer.diskStorage({
//       destination: './docs',
//       filename: (req, file, cb) => {
//          cb(null, `${Date.now()}-${file.originalname}`);
//       },
//    }),
// });

const storage = multer.diskStorage({
   destination: () => {
      cb(null, 'docs/')
   },
   filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
   },
})


const uploadByMulter = multer({
   storage: storage,
   fileFilter: (req, file, cb) => {
      if (path.extname(file.originalname) !== '.csv') {
         return cb(new Error('Only .csv file allowed'))
      }
      cb(null, true)
   }
});

export default uploadByMulter;