'use client';

import FileDrop from "@/component/fileDrop/FileDrop";
import styles from "./upload.module.css";

export default function Upload() {
   const onHandleFile = async (file) => {
      try {
         const formData = new FormData();
         formData.append("file", file[0]);
         const response = await fetch("api/upload", {
            method: "POST",
            body: formData,
            headers: {
               'Accept': 'multipart/form-data'
            },
         });
         if (!response.ok) throw new Error(await response.text());
         const result = await response.json();
         console.log(result);
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <section className={styles.dropzone}>
         <FileDrop onFileUpload={(data) => onHandleFile(data)} />
      </section>
   );
}
