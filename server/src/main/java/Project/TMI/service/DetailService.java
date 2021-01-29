package Project.TMI.service;

import Project.TMI.domain.PlanDetail.Detail;
import Project.TMI.domain.PlanDetail.Transpotation;
import Project.TMI.dto.TranspotationSaveDto;
import Project.TMI.repository.DetailRepository;
import Project.TMI.repository.TranspotationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class DetailService {

    private final DetailRepository detailRepository;
    private final TranspotationRepository transpotationRepository;

    /** common */
    //detail 하나 상세조회
    public Object getOneDetail(Long detailId){
        Object detail = detailRepository.findById(detailId).orElseThrow();
        return detail;
    }

    //detail List 가져오기
    public List<Detail> getAllDetail(Long planId){
        List details = detailRepository.findAllByPlanId(planId);
        return details;
    }

    //detail 삭제
    @Transactional
    public void deleteDetail(Long detailId){
        Object detail = detailRepository.findById(detailId).orElseThrow();
        detailRepository.delete(detail);
    }

    /** Transpotation */
    //Traspotation 생성
    @Transactional
    public void saveTranspotation(TranspotationSaveDto transpotationSaveDto){
        detailRepository.save(transpotationSaveDto.toEntity());
    }

    @Transactional
    //Traspotation 수정
    public void updateTranspotation(Long detailId, TranspotationSaveDto transpotationSaveDto){
        Transpotation transpotation = (Transpotation)detailRepository.findById(detailId).orElseThrow();
        transpotation.updateTranspotation(transpotationSaveDto);
    }

}
