package org.zerock.service;

import java.util.HashMap;

import org.zerock.domain.CustomerVO;

public interface CustomerService {
	public HashMap<String, Object> getLoginInfo(String socialId);
	public String getCustomerName(long customerCode);
	public void insertBuyer(CustomerVO customer);
	public void insertSeller(CustomerVO customer);
	public String getCompanyName(long customerCode);
	public CustomerVO getBuyerProfile(long customerCode);
	public CustomerVO getSellerProfile(long customerCode);
	public String getSocialId(long customerCode);
	public void deleteCustomer(long customerCode);
	public void updateBuyer(CustomerVO updateCustomer);
	public void updateSeller(CustomerVO updateCustomer);
	public int updatePoint(long customerCode, long totalPoint);
	public int getPoint(Long customerCode);
}
