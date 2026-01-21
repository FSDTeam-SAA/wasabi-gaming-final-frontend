import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Card, 
  Button, 
  Badge, 
  Form, 
  Input, 
  Row, 
  Col, 
  Typography,
  Alert 
} from "antd";
import { 
  CreditCardOutlined, 
  LockOutlined,
  CheckOutlined 
} from "@ant-design/icons";
import { IMAGES } from "../../../assets";

const { Title, Text, Paragraph } = Typography;

export const PaymentPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [form] = Form.useForm();

  // Mock data - replace with your actual API calls
  useEffect(() => {
    const mockCourse = {
      id: courseId,
      title: "Advanced Negotiation Skills",
      description: "Learn proven negotiation strategies to maximize your salary and benefits",
      image: IMAGES.course,
      level: "Advanced",
      category: "Career Development",
      duration: "4h 20m",
      rating: "4.9",
      students: "560",
      price: 49.99
    };

    setCourse(mockCourse);
  }, [courseId]);

  const handlePayment = async (values) => {
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Here you would typically call your payment API
      console.log('Payment details:', values);
      
      // After successful payment, redirect to course
      setProcessing(false);
      navigate(`/dashboard/course/${courseId}`);
    }, 2000);
  };

  if (!course) {
    return (
      <div className="bg-white w-full min-h-screen flex items-center justify-center p-8">
        <p className="text-gray-500">Loading course...</p>
      </div>
    );
  }

  return (
    <div className="bg-white w-full min-h-screen">
      <div className="px-4 md:px-16 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Title level={1} className="!text-3xl md:!text-4xl !text-[#1e1e1e] !mb-2">
            Complete Your Purchase
          </Title>
          <Paragraph className="!text-lg !text-[#495565]">
            Secure checkout for your course enrollment
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {/* Payment Form */}
          <Col xs={24} lg={16}>
            <Card className="rounded-[20px] border border-gray-200">
              <Title level={2} className="!text-2xl !text-[#1e1e1e] !mb-6">
                Payment Information
              </Title>

              <Form
                form={form}
                layout="vertical"
                onFinish={handlePayment}
                className="flex flex-col gap-6"
              >
                {/* Cardholder Name */}
                <Form.Item
                  name="cardholderName"
                  label="Cardholder Name"
                  rules={[{ required: true, message: 'Please enter cardholder name' }]}
                >
                  <Input 
                    placeholder="John Doe" 
                    className="h-11 rounded-[14px]"
                    size="large"
                  />
                </Form.Item>

                {/* Card Number */}
                <Form.Item
                  name="cardNumber"
                  label="Card Number"
                  rules={[{ required: true, message: 'Please enter card number' }]}
                >
                  <Input 
                    placeholder="1234 5678 9012 3456" 
                    maxLength={19}
                    prefix={<CreditCardOutlined className="text-gray-400" />}
                    className="h-11 rounded-[14px]"
                    size="large"
                  />
                </Form.Item>

                {/* Expiry and CVV */}
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="expiryDate"
                      label="Expiry Date"
                      rules={[{ required: true, message: 'Please enter expiry date' }]}
                    >
                      <Input 
                        placeholder="MM/YY" 
                        maxLength={5}
                        className="h-11 rounded-[14px]"
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="cvv"
                      label="CVV"
                      rules={[{ required: true, message: 'Please enter CVV' }]}
                    >
                      <Input 
                        placeholder="123" 
                        maxLength={3}
                        type="password"
                        className="h-11 rounded-[14px]"
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {/* Security Notice */}
                <Alert
                  message="Your payment information is encrypted and secure"
                  icon={<LockOutlined />}
                  className="bg-[#fffe0033] border border-[#ffff0066] rounded-[14px]"
                />

                {/* Submit Button */}
                <Form.Item className="!mb-0">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={processing}
                    style={{backgroundColor: "#ffff00", color: "black"}}
                    className="h-12 w-full bg-[#ffff00] hover:bg-[#e5e500] border-[#ffff00] text-[#1e1e1e] rounded-[14px] font-normal text-base"
                  >
                    {processing ? "Processing..." : `Complete Payment - $${course.price}`}
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          {/* Order Summary */}
          <Col xs={24} lg={8}>
            <Card className="rounded-[20px] border border-gray-200 sticky top-8">
              <Title level={3} className="!text-xl !text-[#1e1e1e] !mb-6">
                Order Summary
              </Title>

              <div className="flex flex-col gap-6">
                {/* Course Preview */}
                <div className="flex flex-col gap-4">
                  <div 
                    className="w-full h-40 rounded-[14px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${course.image})` }}
                  />

                  <div className="flex flex-col gap-2">
                    <Title level={4} className="!text-lg !text-[#1e1e1e] !mb-0">
                      {course.title}
                    </Title>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="rounded-[14px] border-gray-300 text-[#1e1e1e] text-xs h-6 px-2">
                        {course.level}
                      </Badge>
                      <Badge className="rounded-[14px] border-gray-300 text-[#1e1e1e] text-xs h-6 px-2">
                        {course.category}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-gray-200 pt-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Text className="!text-[#495565]">Course Price</Text>
                    <Text className="!text-[#1e1e1e]">${course.price}</Text>
                  </div>
                  <div className="flex items-center justify-between">
                    <Text className="!text-[#495565]">Tax</Text>
                    <Text className="!text-[#1e1e1e]">$0.00</Text>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <Text strong className="!text-xl !text-[#1e1e1e]">
                    Total
                  </Text>
                  <Title level={3} className="!text-2xl !text-[#1e1e1e] !mb-0">
                    ${course.price}
                  </Title>
                </div>

                {/* Features */}
                <div className="border-t border-gray-200 pt-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <CheckOutlined className="text-green-600" />
                    <Text className="!text-sm !text-[#495565]">Lifetime access</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckOutlined className="text-green-600" />
                    <Text className="!text-sm !text-[#495565]">Certificate of completion</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckOutlined className="text-green-600" />
                    <Text className="!text-sm !text-[#495565]">30-day money-back guarantee</Text>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};