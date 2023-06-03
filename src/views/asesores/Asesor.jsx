import React, { Fragment } from 'react'
import { Breadcrumb, Col, Row } from 'reactstrap'
import TablaAsesor from './TablaAsesor'

const Asesor = () => {
  return (
    <Fragment>
      <Breadcrumb title='Datatables Advance' data={[{ title: 'Datatables' }, { title: 'Datatables Advance' }]} />
      <Row>
        <Col sm='12'>
          <TablaAsesor />
        </Col>
      </Row>
    </Fragment>
  )
}

export default Asesor