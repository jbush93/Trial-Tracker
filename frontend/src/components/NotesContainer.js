import React, { Component, useEffect, useState } from 'react'


function NotesContainer({ setNotes })
{

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    // useEffect(function ()
    // {
    //     fetch(`http://localhost:3000/patients?page=${page}`)
    //         .then(function (resp)
    //         {
    //             // Get the total number of pages from the response headers
    //             const totalPages = parseInt(resp.headers.get('Total-Pages'))
    //             // console.log(resp.headers.get('Total-Pages'))
    //             setTotalPages(totalPages)

    //             return resp.json()
    //         })
    //         .then(function (data)
    //         {
    //             return setPatients(data)
    //         })
    // }, [page])
    // console.log(totalPages)

    useEffect(function ()
    {
        fetch("http://localhost:3000/notes")
            .then(function (resp)
            {
                return resp.json()
            })
            .then(function (data)
            {
                console.log(data)
                return setNotes(data)
            })
    }, [])

    function handleBack()
    {
        setPage(page - 1)
    }
    function handleNext()
    {
        if (page < totalPages) { // Check if we are not on the last page
            setPage(page + 1)
        }
    }

    // const mappedPatients = patients.map(function (patient)
    // {
    //     return <PatientsCard  />
    // })

    return (
        <div className='notesContainer'>
            <div>
                <p>search / filter /</p>
            </div>
            <div>
                {/* {mappedTrials} */}
            </div>
            <div>
                <button onClick={handleBack} disabled={page === 1}>Previous Page</button>
                <button onClick={handleNext} disabled={page === totalPages}>Next Page</button>
            </div>
        </div>
    )
}

export default NotesContainer