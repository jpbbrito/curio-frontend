import { IonPage, IonContent } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation'

import { getAllProblems, } from '../services/curio-api';
import './Home.css';

import { Problem } from '../interfaces/Problems';

import MapContent from '../components/MapContent'
import Header from '../components/Header'
import SideMenu from '../components/SideMenu';
import FormProblem from '../components/FormProblem';

const Home: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState<any>()
  const [problems, setProblems] = useState<Problem[]>([])
  const [selectCity, setSelectCity] = useState<any>()
  const [openFormProblem, setOpenFormProblem] = useState(false)

  async function getCurrenPosition(problems: any) {
    try {
      const coordinates = await Geolocation.getCurrentPosition()
      console.log('[getCurrenPosition] coordinates', coordinates)
      setCurrentPosition({ lat: coordinates.coords.latitude, lng: coordinates.coords.longitude })
    } catch (error) {
      console.log('[getCurrenPosition] error', error)
      const lastProblem = problems[0]
      console.log('[getCurrenPosition] lastProblem', lastProblem)
      console.log('[getCurrenPosition] problems', problems)
      setCurrentPosition({ lat: Number.parseFloat(lastProblem.latitude), lng: Number.parseFloat(lastProblem.longitude) })

    }
  }

  useEffect(() => {

    console.log('[fetchData]')

    const fetchData = async () => {
      const response = await getAllProblems(1, 10);
      console.log(response)
      if (response === 'error_api') {
        setProblems([])
      }
      const problems: Problem[] = response;

      await getCurrenPosition(problems)
      await setProblems(problems)
    }

    if (problems.length === 0) {
      fetchData()
    }

  }, [problems, selectCity])

  useEffect(() => {
    if (selectCity) {
      setCurrentPosition(selectCity.currentPosition)
      setProblems(selectCity.problems)
    }

  }, [selectCity])
  console.log('selectCity', selectCity)
  return (

    <>
      <SideMenu setIsOpenModal={setOpenFormProblem}/>
      <IonPage id="main-content">
        <Header callback={setSelectCity} />
        <IonContent>
          <MapContent problems={problems} currentPosition={currentPosition}></MapContent>
          <FormProblem isOpenModal={openFormProblem} setIsOpenModal={setOpenFormProblem}/> 
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
