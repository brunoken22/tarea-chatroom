import * as express from "express";
import { baseDeDatos, rtdb } from "./db";
import { nanoid } from "nanoid";
import * as cors from "cors";
import { match } from "assert";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
const usersCollection = baseDeDatos.collection("/users");
const roomsCollection = baseDeDatos.collection("/rooms");

app.post("/singup", (req, res) => {
   const email = req.body.email;
   const nombre = req.body.nombre;

   usersCollection
      .where("email", "==", email)
      .get()
      .then((searchResponse) => {
         if (searchResponse.empty) {
            usersCollection
               .add({
                  email,
                  nombre,
               })
               .then((newUserRef) => {
                  res.json({
                     id: newUserRef.id,
                     new: true,
                  });
               });
         } else {
            res.json({
               id: searchResponse.docs[0].id,
            });
         }
      });
});
app.post("/auth", (req, res) => {
   const { email } = req.body;

   usersCollection
      .where("email", "==", email)
      .get()
      .then((searchResponse) => {
         if (searchResponse.empty) {
            res.status(400).json({
               message: "Not found",
            });
         } else {
            res.json({
               id: searchResponse.docs[0].id,
            });
         }
      });
});

app.post("/rooms", (req, res) => {
   const { userId } = req.body;
   usersCollection
      .doc(userId.toString())
      .get()
      .then((doc) => {
         if (doc.exists) {
            const refroomrtdb = rtdb.ref("rooms/" + nanoid(6));
            refroomrtdb
               .set({
                  messages: [],
                  owner: userId,
               })
               .then(() => {
                  const idRoom = refroomrtdb.key;
                  const newIdRoom = 1000 + Math.floor(Math.random() * 999);
                  roomsCollection
                     .doc(newIdRoom.toString())
                     .set({
                        rtdbRoomId: idRoom,
                     })
                     .then(() => {
                        res.json({
                           id: newIdRoom.toString(),
                        });
                     });
               });
         } else {
            res.status(401).json({
               message: "No Existis",
            });
         }
      });
});
app.get("/rooms/:idRoom", (req, res) => {
   const { usersId } = req.query;
   const { idRoom } = req.params;

   usersCollection
      .doc(usersId.toString())
      .get()
      .then((doc) => {
         if (doc.exists) {
            roomsCollection
               .doc(idRoom)
               .get()
               .then((doc) => {
                  const data = doc.data();
                  res.json(data);
               });
         } else {
            res.status(401).json({
               message: "No Existis",
            });
         }
      });
});
app.post("/rooms/:rtdbRoom", (req, res) => {
   const { rtdbRoom } = req.params;
   const chatRoomRef = rtdb.ref("/rooms/" + rtdbRoom + "/messages");

   chatRoomRef.push(req.body, function (e) {
      res.json("todo ok.");
   });
});
app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`);
});

// app.post("/messages", (req, res) => {
//    const chatRoomRef = rtdb.ref("/messages/general/messages");
//    console.log(req.body);

//    chatRoomRef.push(req.body, function (e) {
//       res.json("Todo ok.");
//    });
// });
// const userCollection = baseDeDatos.collection("users");

// app.get("/users/:userId", (req, res) => {
//    const userId = req.params.userId;
//    const userDoc = userCollection.doc(userId);

//    userDoc.get().then((snap) => {
//       const userData = snap.data();
//       res.json(userData);
//    });
// });

// app.get("/users/:userId", (req, res) => {
//    res.json({ params: req.params, message: "un usuario en particular" });
// });

// app.post("/users", (req, res) => {
//    res.json({ id: 1, name: "bruno" });
// });

// app.patch("/users/:id", (req, res) => {
//    const userId = req.params.id;
//    const userDoc = userCollection.doc(userId);
//    const upDateObject = req.body;
//    upDateObject.updateAt = new Date();

//    userDoc.update(upDateObject).then((snap) => {
//       console.log(snap);

//       res.json({ message: "Ok" });
//    });
// });

// app.delete("/users/:userId", (req, res) => {
//    const userId = req.params.userId;
//    userCollection
//       .doc(userId)
//       .delete()
//       .then((result) => {
//          res.json({ message: "Eliminado" });
//          res.status(204);
//       });
// });

// ******************************

// app.get("/users/:userId", (req, res) => {
//    const userId = req.params.userId;
//    const userDoc = userCollection.doc(userId);

//    userDoc.get().then((snap) => {
//       const userData = snap.data();
//       res.json(userData);
//    });
// });

// app.get("/users/:userId", (req, res) => {
//    res.json({ params: req.params, message: "un usuario en particular" });
// });

// app.post("/users", (req, res) => {
//    res.json({ id: 1, name: "bruno" });
// });

// app.patch("/users/:id", (req, res) => {
//    const userId = req.params.id;
//    const userDoc = userCollection.doc(userId);
//    const upDateObject = req.body;
//    upDateObject.updateAt = new Date();

//    userDoc.update(upDateObject).then((snap) => {
//       console.log(snap);

//       res.json({ message: "Ok" });
//    });
// });

// app.delete("/users/:userId", (req, res) => {
//    const userId = req.params.userId;
//    userCollection
//       .doc(userId)
//       .delete()
//       .then((result) => {
//          res.json({ message: "Eliminado" });
//          res.status(204);
//       });
// });
