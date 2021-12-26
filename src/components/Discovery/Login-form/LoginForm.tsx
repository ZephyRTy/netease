import { Button, Checkbox, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import cookies from 'react-cookies';
import { user } from '../../../utils/model/user';
import './style/LoginForm.scss';

export const LoginForm = () => {
	const [form] = Form.useForm();
	useEffect(() => {
		if (user.LogStatus) {
			return;
		}
		if (cookies.load('phone') && form.getFieldValue('remember')) {
			user.logIn(cookies.load('phone'), cookies.load('password'));
		}
	}, []);
	return (
		<Form
			autoComplete="off"
			form={form}
			initialValues={{ remember: true }}
			labelCol={{ span: 8 }}
			name="basic"
			onFinish={() => {
				user.logIn(
					form.getFieldValue('phonenumber'),
					form.getFieldValue('password')
				);
			}}
			wrapperCol={{ span: 16 }}
		>
			<Form.Item
				label="手机号"
				name="phonenumber"
				rules={[{ required: true, message: '请输入手机号' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="密码"
				name="password"
				rules={[{ required: true, message: '请输入密码' }]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				name="remember"
				valuePropName="checked"
				wrapperCol={{ offset: 8, span: 16 }}
			>
				<Checkbox>自动登录</Checkbox>
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button htmlType="submit" type="primary">
					登录
				</Button>
			</Form.Item>
		</Form>
	);
};
