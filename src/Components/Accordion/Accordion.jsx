

import { useState } from 'react'
import data from '../Accordion/data'
import './styles.css'



export default function Accordion() {

    const [selected, setSelected] = useState(null)
    const [noticeSign, setNoticeSign] = useState('+')
    const [multiple, setMultiple] = useState([]);
    const [enableMultiple, setEnableMultiple] = useState(false)

    function handleSingleSelect(getCurrentId) {
        setSelected(getCurrentId === selected ? null : getCurrentId);
        setNoticeSign('-');
    }

    function handleMultiple(getCurrentId) {
        let cpyMultiple = [...multiple]
        const currentIndex = cpyMultiple.indexOf(getCurrentId)

        if (currentIndex === -1) {
            cpyMultiple.push(getCurrentId )
        } else cpyMultiple.splice(currentIndex, 1)

        setMultiple(cpyMultiple)
        
    }

    return <div className="container">
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
        <h1>Top stores at a glance</h1>
        <button onClick={() => setEnableMultiple(!enableMultiple)}>Enable Multiple{enableMultiple? ' ON':' Off'}</button>
       
        </div>
         {
            data && data.length > 0 ?
                data.map(item => {
                    return <div className="accordion">

                        <div className="item">
                            <div className="title"
                                onClick={enableMultiple ?
                                    ()=>handleMultiple(item.id) :
                                   ()=> handleSingleSelect(item.id)

                                }>
                                <div>
                                    <div className='--img-bg'>

                                        <img src={`./images/${item.coverImg}`} className='--story-img' alt={item.title} />
                                    </div>
                                    <h3 className='--story-title'>{item.title}</h3>
                                </div>

                                {item.id === selected || multiple.indexOf(item.id)!== -1 ? <span>{noticeSign}</span> : <span>+</span>}
                            </div>
                            {

                                enableMultiple ?
                                    multiple.indexOf(item.id)!== -1
                                     && 
                                    <p className="desc">
                                        {item.description}
                                    </p>
                                    :
                                     selected === item.id &&
                                        <p className="desc">
                                            {item.description}
                                        </p>
                            }

                        </div>
                    </div>
                })
                : null
        }

    </div>
}