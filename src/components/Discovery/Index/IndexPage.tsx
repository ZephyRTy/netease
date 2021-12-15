import React from 'react';
import {Navbar} from '../NavBar/Navbar';
import { Carouse } from '../Carouse/Carouse';
import { HotRecommend } from '../HotRecommend/HotRecommend';
import {NewAlbum} from '../NewAlbum/NewAlbum';
import { Ranking } from '../Ranking/Ranking';
import { SettleSinger } from '../SettleSinger/SettleSinger';
export const IndexPage = () => {
    return (
        <div>
            <SettleSinger />
        </div>
    )
}
