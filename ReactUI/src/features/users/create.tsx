import React from 'react'
import { Card, Col, Row } from 'antd'
import { useAppDispatch } from '../../app/hooks'
import { addUser } from './usersSlice'
import { useNavigate } from 'react-router-dom'
import FormComponent from './components/formComponent'

const Create: React.FC = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const onFinish = (values: any) => {
    dispatch(addUser(values))
    navigate('/admin/auth')
  }

  return (
    <Card>
      <Row style={{ marginTop: 16 }}>
        <Col span={24}>
          <FormComponent onFinish={onFinish} />
        </Col>
      </Row>
    </Card>
  )
}

export default Create
