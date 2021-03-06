package org.zerock.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.zerock.domain.CategoryVO;
import org.zerock.domain.DetailVO;
import org.zerock.domain.ProductVO;
import org.zerock.mapper.ProductMapper;

import lombok.Setter;

@Service
public class ProductServiceImpl implements ProductService{

	@Setter(onMethod_ = @Autowired)
	private ProductMapper pm;
	
	@Override
	public List<CategoryVO> getCategory() {
		
		return pm.getCategory();
	}
	
	@Override
	public void register(ProductVO p) {
		
//		log.info("register is done");
		
		pm.register(p);
	}
	
	@Override
	public List<ProductVO> getList() {
		
		return pm.getList();
	}
	
	@Override
	public DetailVO getById(int product_code) {
		
		return pm.getById(product_code);
	}
	
	@Override
	public int getCount(int categoryCode) {
		
		return pm.getCount(categoryCode);
	}
	
	@Override
	public List<ProductVO> getListByCategory(int startIdx, int categoryCode) {
		HashMap<String, Object> hm = new HashMap<String, Object>();
		hm.put("startIdx", startIdx);
		hm.put("categoryCode", categoryCode);
		
		return pm.getListByCategory(hm);
	}
	
	@Override
	public void ProductDelete(int product_code) {
		
		pm.ProductDelete(product_code);
	}
	
	@Override
	public void ProductModify(ProductVO p) {
		
		pm.ProductModify(p);
	}

	@Override
	public int subStock(HashMap<String, Object> productInfoHm) {
		int totalRow = 0;
		List<Integer> productCodeList = (List<Integer>) productInfoHm.get("productCodeList");
		List<Integer> productQuantityList = (List<Integer>) productInfoHm.get("productQuantityList");
		HashMap<String, Object> productInfo = new HashMap<String, Object>();
		
		for (int i=0; i<productCodeList.size(); i++) {
			productInfo.put("productCode", productCodeList.get(i));
			productInfo.put("productQuantity", productQuantityList.get(i));
			
			totalRow += pm.subStock(productInfo);
		}
		
		return totalRow;
	}

}