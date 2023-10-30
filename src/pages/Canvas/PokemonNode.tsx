import { memo, useState } from 'react';
import './Canvas.css'

interface PokemonNodeProps {
    data: {
        id: number;
        name: string;
        abilities: any;
        moves: any;
        sprites: any;
        types: any;
        stats: any;
    };
}

const PokemonNode : React.FC<PokemonNodeProps> = ({ data }) => {

    return (
        <>
            <div className='custom-drag-handle' style={{width: '507px', height:'100%', position:'absolute', backgroundColor: 'rgba(255,255,255,0.00)'}}>
                <div className='name'>{ data.name } #{ data.id }</div>
                <div className='stats'>
                    {    
                        data.stats.map((stat: any, idx: number) => (
                            <div key={idx}>
                                <b style={{color: '#ff0'}}> { stat.stat.name } </b>
                                <br />
                                { stat.base_stat }
                            </div>
                        ))
                    }
                </div>
                <div className='ability'>
                    <b style={{color: '#ff0'}}> @Ability : &nbsp; </b>
                    { 
                        data.abilities.map((ability: any, idx: number) => (
                            <div key={idx}>
                                { idx }.{ ability.ability.name }; &nbsp;
                            </div>
                        ))
                    }
                </div>
                <div className='moves'>
                    <b style={{color: '#ff0'}}>@Movie : &nbsp; </b>
                    <select id='moves' name='moves'>
                        {
                            data.moves.map((move: any, idx: number) => (
                                <option key={idx}>
                                    { move.move.name }
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className='sprites'>
                    <b style={{color: '#ff0'}}>@Sprites : &nbsp; </b>
                    <select id='sprites' name='sprites' onChange={(event) => window.location.href = (data.sprites[`${event.currentTarget.value}`])}>
                        <option> back_default </option>
                        <option> back_female </option>
                        <option> back_shiny </option>
                        <option> back_shiny_female </option>
                        <option> front_default </option>
                        <option> front_female </option>
                        <option> front_shiny </option>
                        <option> front_shiny_female </option>
                    </select>
                </div>
                <div className='types'>
                    <b style={{color: '#ff0'}}>@Types : &nbsp; </b>
                    { 
                        data.types.map((tp: any, idx: number) => (
                            <div key={idx}>
                                { idx }.{ tp.type.name }; &nbsp;
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default memo(PokemonNode);
