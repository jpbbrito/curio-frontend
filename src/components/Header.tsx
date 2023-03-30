import { IonButton, IonMenuButton } from '@ionic/react';

import logo from '../images/curio_icon-128-128-circle.svg'
import './Header.css'

const Header = () => {
    return (
        <>
            <div className='header'>
                <IonMenuButton></IonMenuButton>
                <div className='logo'>

                    <a href="/home">

                        <img src={logo} alt="Projeto Curio"></img>
                    </a>
                </div>
                <IonButton shape='round'>Login</IonButton>
            </div>
        </>
    )
}

export default Header;