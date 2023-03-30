import { IonPage, IonContent } from '@ionic/react';
import './Home.css';

import MapContent from '../components/MapContent'
import Header from '../components/Header'
import SideMenu from '../components/SideMenu';

const Home: React.FC = () => {

  return (
    <>
      <SideMenu />
      <IonPage id="main-content">
        <Header />
        <IonContent>
          <MapContent></MapContent>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
