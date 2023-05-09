import React, { useEffect, useState } from 'react';
import { IonButton, IonMenuButton, IonActionSheet } from '@ionic/react';

import { getAllProblemsByLocation, getCities } from '../services/curio-api'
import logo from '../images/curio_icon-128-128-circle.svg'
import './Header.css'
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

import { Problem } from '../interfaces/Problems'

const Header = ({ callback }: any) => {
    const [result, setResult] = useState<OverlayEventDetail>();
    const [isOpen, setIsOpen] = useState(false);
    const [cities, setCities] = useState([])
    const [problems, setProblems] = useState<Problem[]>()

    function getProblemsByCity (city: string, state: string, country: string) {
        const fetchDatas = async () => {
            const result: Problem[] = await getAllProblemsByLocation({city,state, country}, 1, 10)
            console.log('[fetchDatas] getProblemsByCity - ', result)
            callback({ problems: result, currentPosition: { lat: Number.parseFloat(result[0].latitude), lng: Number.parseFloat(result[0].longitude) }})
            setProblems(result)
        }
        fetchDatas()
    }

    function switchActionsSheet() {
        console.log('[switchActionsSheet] isOpen - ', isOpen)
        if (isOpen) {
            setIsOpen(false)
        } else {
            setIsOpen(true)
        }
    }

    useEffect(() => {
        const fetchDatas = async () => {
            const result = await getCities();
            console.log('[fetchDatas] getCities - ', result)
            setCities(result)
            
        }

        fetchDatas()
    }, [problems])

    return (
        <>
            <div className='header'>
                <IonMenuButton></IonMenuButton>
                <div className='logo'>

                    <a href="/home">

                        <img src={logo} alt="Projeto Curio"></img>
                    </a>
                </div>
                <IonButton onClick={switchActionsSheet}>Cidades</IonButton>

                {
                    cities.length > 0 &&
                        <IonActionSheet
                            isOpen={isOpen}
                            header="Cidades"
                            buttons={
                                cities.map((value: any) => {
                                    const cityName =  `${value.city}-${value.state}` 
                                    return {
                                        text: cityName,
                                        handler: () => {
                                            setIsOpen(false)
                                            console.log('[ActionSheet] cityName', cityName)
                                            getProblemsByCity(value.city, value.state, value.country)
                                        }
                                    }
                                })
                            }
                            onDidDismiss={({ detail }) => {
                                setResult(detail)
                                setIsOpen(false)
                                console.log('[onDidDismiss] Aqui')
                            }}
                        >
                            {result && <code>{JSON.stringify(result, null, 2)}</code>}
                        </IonActionSheet>
                }

            </div>
        </>
    )
}

export default Header;