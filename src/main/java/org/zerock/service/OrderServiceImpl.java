package org.zerock.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;
import org.zerock.domain.OrderVO;
import org.zerock.mapper.OrderMapper;

@Repository
public class OrderServiceImpl implements OrderService {
	@Resource
	private OrderMapper orderMapper;
	
	@Override
	public int createOrder(int totalPrice, long customerCode) {
		OrderVO orderVO = new OrderVO();
		orderVO.setTotalOrderPrice(totalPrice); //orderVO �ν��Ͻ��� totalPrice �ʵ尪 set.
		orderVO.setCustomerCode(customerCode); //orderVO �ν��Ͻ��� customerCode �ʵ尪 set.
		
		orderMapper.createOrder(orderVO);
		int orderCode = orderVO.getOrderCode();
		System.out.println("order ���̺� ������ ���� �Ϸ�\norderCode : " + orderCode);
	
		return orderCode;
	}

	//delivery ���ͼ��Ϳ��� �������� �� �α��ε� ������� ����ڵ����� �˾ƺ��� ���� ������
	@Override
	public long getCustomerCode(int deliveryCode) {
		long customerCode = orderMapper.getCustomerCode(deliveryCode);
		
		return customerCode;
	}

}