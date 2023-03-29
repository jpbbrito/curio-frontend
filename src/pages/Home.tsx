import { IonPage, IonContent} from '@ionic/react';
import './Home.css';

import MapContent from '../components/MapContent'
import Header from '../components/Header'

const Home: React.FC = () => {

  return (
    <IonPage>
      <Header/>
      <IonContent>
        <MapContent></MapContent>
      </IonContent>
    </IonPage>
  );
};

export default Home;
