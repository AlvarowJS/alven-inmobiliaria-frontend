// ** Third Party Components
import classnames from 'classnames'
import { TrendingUp, User, Box, DollarSign, UserPlus, Users } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'

const Informacion = ({ cols }) => {
  const data = [
    {
      title: '50',
      subtitle: 'Clientes',
      color: 'light-primary',
      icon: <UserPlus size={24} />
    },
    {
      title: '200',
      subtitle: 'Clientes',
      color: 'light-info',
      icon: <Users size={24} />
    },
    {
      title: '$122k',
      subtitle: 'Desembolsado',
      color: 'light-danger',
      icon: <DollarSign size={24} />
    },
    {
      title: 'S/.233',
      subtitle: 'Desembolsado',
      color: 'light-success',
      icon: <DollarSign size={24} />
    }
  ]

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols)
      const margin = index === 2 ? 'sm' : colMargin[0]
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1
          })}
        >
          <div className='d-flex align-items-center'>
            <Avatar color={item.color} icon={item.icon} className='me-2' />
            <div className='my-auto'>
              <h4 className='fw-bolder mb-0'>{item.title}</h4>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4'>Información</CardTitle>
        <CardText className='card-text font-small-2 me-25 mb-0'>Mes actual</CardText>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default Informacion
