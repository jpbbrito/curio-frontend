import { IonText, IonCard, IonCardContent, IonButton } from '@ionic/react';

import { Problem } from '../interfaces/Problems';

import './PointCard.css';

interface IProps {
    point: Problem,
    cleanPointStates: any,
    setIsOpenModal: any
}

function PointCard({ point, cleanPointStates, setIsOpenModal}: IProps) {
    return (
        <IonCard>
            <IonCardContent>
                <IonText>
                    <h1>Descrição: {point.description} </h1>
                </IonText>

                <IonText>
                    <p>Endereço: {point.address}</p>
                    <p>Bairro: {point.neighborhood}</p>
                    <p>Cidade: {point.city}</p>
                    <p>Estado: {point.state} </p>
                    <p>País: {point.country} </p>
                </IonText>
            </IonCardContent>
            <div className='buttons-space'>
                <IonButton onClick={() => setIsOpenModal(true)} size="small" fill="outline"> Imagem </IonButton>
                <IonButton size="small" onClick={cleanPointStates}> Fechar </IonButton>
            </div> 
        </IonCard>
    )
}

export default PointCard;