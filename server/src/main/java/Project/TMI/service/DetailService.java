package Project.TMI.service;

import Project.TMI.advice.exception.CDetailNotFoundException;
import Project.TMI.domain.PlanDetail.Accommodation;
import Project.TMI.domain.PlanDetail.Activity;
import Project.TMI.domain.PlanDetail.Detail;
import Project.TMI.domain.PlanDetail.Transportation;
import Project.TMI.dto.AccommodationSaveDto;
import Project.TMI.dto.ActivitySaveDto;
import Project.TMI.dto.TransportationSaveDto;
import Project.TMI.repository.DetailRepository;
import Project.TMI.repository.TransportationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class DetailService {

    private final DetailRepository detailRepository;
    private final TransportationRepository transportationRepository;

    /**
     * common
     */
    //detail 하나 상세조회
    public Object getOneDetail(Long detailId) {
        try {
            Object detail = detailRepository.findById(detailId).orElseThrow();
            return detail;
        } catch (Exception e) {
            throw new CDetailNotFoundException();
        }
    }

    //detail List 가져오기
    public List<Detail> getAllDetail(Long planId) {
        try {
            List details = detailRepository.findAllByPlanId(planId, sortByDateAndTime());
            return details;
        } catch (Exception e) {
            throw new CDetailNotFoundException();
        }
    }

    //detail 삭제
    @Transactional
    public void deleteDetail(Long detailId) {
        try {
            Object detail = detailRepository.findById(detailId).orElseThrow();
            detailRepository.delete(detail);
        } catch (Exception e) {
            throw new CDetailNotFoundException();
        }
    }

    /**
     * Transportation
     */
    //Traspotation 생성
    @Transactional
    public void saveTransportation(TransportationSaveDto transportationSaveDto) {
        detailRepository.save(transportationSaveDto.toEntity());
    }

    @Transactional
    //Traspotation 수정
    public void updateTransportation(Long detailId, TransportationSaveDto transportationSaveDto) {
        Transportation transportation = (Transportation) detailRepository.findById(detailId).orElseThrow();
        transportation.updateTransportation(transportationSaveDto);
    }

    /**
     * Accommodation
     */
    //Accommodation 생성
    @Transactional
    public void saveAccommodation(AccommodationSaveDto accommodationSaveDto) {
        detailRepository.save(accommodationSaveDto.toEntity());
    }

    @Transactional
    //Accommodation 수정
    public void updateAccommodation(Long detailId, AccommodationSaveDto accommodationSaveDto) {
        Accommodation accommodation = (Accommodation) detailRepository.findById(detailId).orElseThrow();
        accommodation.updateAccommodation(accommodationSaveDto);
    }

    /**
     * Activity
     */
    //Activity 생성
    @Transactional
    public void saveActivity(ActivitySaveDto activitySaveDto) {
        detailRepository.save(activitySaveDto.toEntity());
    }

    @Transactional
    //Activity 수정
    public void updateActivity(Long detailId, ActivitySaveDto activitySaveDto) {
        Activity activity = (Activity) detailRepository.findById(detailId).orElseThrow();
        activity.updateActivity(activitySaveDto);
    }

    /**
     * others
     */
    //Detail 리스트의 정렬을 지정해 줍니다.
    private Sort sortByDateAndTime() {
        return Sort.by(Sort.Order.asc("date"), Sort.Order.asc("time"));
    }

}
