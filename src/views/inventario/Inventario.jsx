import React, { Fragment } from 'react'
import { Breadcrumb, Col, Row } from 'reactstrap'
import TablaInventario from './TablaInventario'

const Inventario = () => {
  return (
    <Fragment>
      <Breadcrumb title='Datatables Advance' data={[{ title: 'Datatables' }, { title: 'Datatables Advance' }]} />
      <Row>      
        <Col sm='12'>
          <TablaInventario />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Inventario