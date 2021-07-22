import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { trash } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useAuth } from '../auth';
import { firestore } from '../firebase';
import { Entry, toEntry } from '../models';
import { formatDate } from './date';


interface RouteParam{
  id: string;
}
const EntryPage: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<RouteParam>();
  const [entry,setEntry]= useState<Entry>();
  const {userId} = useAuth();
  useEffect(()=>{
    const entryRef = firestore.collection("users").doc(userId).collection("entries").doc(id);
    entryRef.get().then((doc)=>setEntry(toEntry(doc)))
  },[userId,id]);

  const handleDelete = async () =>{
    const entryRef = firestore.collection("users").doc(userId).collection("entries").doc(id);
    await entryRef.delete();
    history.goBack();
  }
  console.log('[Entry] page')
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton/>
          </IonButtons>
          <IonTitle>Entry page {formatDate(entry?.date)} </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleDelete}>
              <IonIcon slot="icon-only" icon={trash}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>{entry?.title}</h2>
        <img src={entry?.pictureURL} alt=''/>
        <p> {entry?.description}</p>
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
