import React, { FormEvent, useState } from 'react';
import logo from '../logo.svg';
import '../App.css';

// window.localStorage.removeItem('chat-logs');
let logs = window.localStorage.getItem('chat-logs') || '';

function Home() {

    let temp = logs.split(',');

    const handleSearch = async (event: FormEvent) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
            keyword: { value: string };
        };

        const keyword = target.keyword.value;
        console.log(keyword);

        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${keyword}`);
        if (res.status == 200) {
            
            if (! temp.includes(keyword)) {
                temp.push(keyword);
            }

            window.localStorage.setItem('chat-logs', temp.toString());

            window.location.href = '/pokemon/' + keyword;
        } else {
            window.alert('Invalid Id or Name');
        }
    }

    return (
        <div className="Home">
            <header className="Home-header">
                <div>
                    {/* <img src={logo} className="Home-logo" alt="logo" /> */}
                    <img src='/logo-3d.png' />
                </div>
                <p>
                    Type the Pokemon id or name...
                </p>
                <form id='search' method='GET' onSubmit={handleSearch}>
                    <input className='search-box' type='text' name='keyword' style={{textAlign: 'center'}} />
                </form>

                <div style={{marginTop: '50px', display: 'flex'}}>
                    {
                        temp.map((log: string, idx: number) => (
                            log && <div key={idx} className='log-btn' onClick={() => window.location.href = `/pokemon/${log}`}> { log } </div>
                        ))
                    }
                </div>
            </header>
        </div>
    );
}

export default Home;
