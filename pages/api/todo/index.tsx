import { NextApiRequest, NextApiResponse } from "next";
import { Timestamp, collection, getDocs, addDoc, setDoc, doc, deleteDoc } from "firebase/firestore";

import { db } from "../../../firebase/clientApp";

type Doc = {
  id: string
  data: any
}
type Data = Array<Object>

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const searchQuery = req.query.q
  if (req.method === 'GET') {
    const getData = getDbCollection()
    getData.then(data => {
      if(searchQuery){
        res.status(200).json(data.filter((todo) => todo.todo.includes(searchQuery)))
      }else{
        res.status(200).json(data)
      }
    })
  }
  else if (req.method === 'POST') {
    try {
      const id = req.body.id
      delete req.body.id
      const docRef = doc(db, 'todo', id)
      const payload = await setDoc(docRef, req.body, { merge: true })
      res.status(200).json({ message: 'Success' })
    } catch (e) {
      throw Error("Something went wrong. Please reload the page.")
    }
  }
  else if (req.method === 'PUT') {
    try {
      const docRef = doc(db, 'todo', req.body.id)
      const payload = await setDoc(docRef, req.body, { merge: true })
      res.status(200).json({ message: 'Success'})
    } catch (e) {
      throw Error("Something went wrong. Please reload the page.")
    }
  }
  else if (req.method === 'DELETE') {
    try {
      const docRef = doc(db, 'todo', req.query.id)
      const payload = await deleteDoc(docRef)
    } catch (e) {
      throw Error("Something went wrong. Please reload the page.")
    }
  }
}

const getDbCollection = async () => {
  const data: Data = []
  const querySnapshot = await getDocs(collection(db, "todo"));
  querySnapshot.forEach((doc: Doc) => {
    const temp = doc.data()
    temp['id'] = doc.id
    data.push(temp)
  })
  return data
}