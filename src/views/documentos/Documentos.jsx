import React, { useEffect } from 'react'
import { Card } from 'reactstrap'

const Documentos = () => {
    useEffect(() => {
        window.open('http://docs.alven-inmobiliaria.com.mx', '_blank')
    }, [])
    
    return (
        <Card style={{with: '100%', height: 1000}} >
            
        </Card>
    )
}

export default Documentos