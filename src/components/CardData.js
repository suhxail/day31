import React from 'react'

function CardData({ value }) {

    const progressBar = <>
        <div className="col">
            <div className="progress progress-sm mr-2">
                <div className="progress-bar bg-info" role="progressbar"
                    style={{ width: '50%' }} aria-valuenow="50" aria-valuemin="0"
                    aria-valuemax="100"></div>
            </div>
        </div>
    </>


    return (
        <>
            <div className="col-xl-3 col-md-6 mb-4">
                <div className={value.border}>
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className={value.fontColor}>
                                    {value.text}</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{value.price}</div>
                            </div>
                            {value.id === "3" ? progressBar : <></>}

                            <div className="col-auto">
                                <i className={value.icon}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CardData

