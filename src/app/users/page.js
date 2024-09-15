"use client"

import { useCallback, useState, useEffect } from "react";
import styles from "./users.module.css";

export default function Users() {
   const [users, setUsers] = useState([]);
   const [loading, setLoading] = useState(true);

   const fetchUsers = useCallback(
      async () => {
         try {
            const res = await fetch('api/users');
            const data = await res.json();
            setUsers(data.users);
         } catch (error) {
            console.error('Failed to fetch users:', error);
         } finally {
            setLoading(false);
         }
      }, []);

   useEffect(() => {
      fetchUsers();
      return () => { }
   }, [fetchUsers]);

   if (loading) {
      return <div className={styles.tableWrapper}>
         <h2 className={styles.nodata}>Loading users...</h2>
      </div>;
   }

   return (
      <div className={styles.tableWrapper}>
         <h1>Users List</h1>
         {users.length > 0 ? (
            <table border="1" cellPadding="10" className={styles.table}>
               <thead>
                  <tr>
                     <th>ID</th>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Phones</th>
                     <th>Creation Date</th>
                  </tr>
               </thead>
               <tbody>
                  <>
                     {users.map((row) => (
                        <tr key={row.id}>
                           <td>{row.id}</td>
                           <td>{row.name}</td>
                           <td>{row.email}</td>
                           <td>{row.phone.join(', ')}</td> {/* Render phones as comma-separated values */}
                           <td>{row.creationDate}</td>
                        </tr>
                     ))}
                  </>
               </tbody>
            </table>
         ) : (
            <p className={styles.nodata}><strong>No users found.</strong></p>
         )}
      </div>
   );
}
