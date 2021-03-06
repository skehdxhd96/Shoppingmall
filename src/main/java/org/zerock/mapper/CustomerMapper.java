package org.zerock.mapper;

import java.util.HashMap;

import org.zerock.domain.CustomerVO;

public interface CustomerMapper {
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
	public int updatePoint(HashMap<String, Object> pointHm);
	public int getPoint(Long customerCode);
}
