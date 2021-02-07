package org.zerock.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.zerock.domain.Criteria;
import org.zerock.domain.basketVO;

public interface basketMapper {

	public List<basketVO> getList(@Param("cri") Criteria cri, @Param("customerCode") Long customerCode);
}
