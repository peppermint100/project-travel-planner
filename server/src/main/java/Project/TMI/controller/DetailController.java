package Project.TMI.controller;

import Project.TMI.domain.Plan;
import Project.TMI.domain.PlanDetail.Detail;
import Project.TMI.domain.PlanDetail.Position;
import Project.TMI.dto.AccommodationSaveDto;
import Project.TMI.dto.ActivitySaveDto;
import Project.TMI.dto.TranspotationSaveDto;
import Project.TMI.model.GetAllDetailSuccess;
import Project.TMI.model.GetDetailSuccess;
import Project.TMI.model.GetPlanDetailSuccess;
import Project.TMI.model.Success;
import Project.TMI.service.DetailService;
import Project.TMI.service.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/detail")
public class DetailController {

    private final PlanService planService;
    private final DetailService detailService;

    /** common apis */
    //1. plan 정보 가져오기
    @GetMapping("/getPlanDetail/{planId}")
    public ResponseEntity<GetPlanDetailSuccess> getPlan(@PathVariable Long planId){

        Plan plan = planService.findById(planId);
        List<Detail> allDetail = detailService.getAllDetail(planId);

        return new ResponseEntity<>(new GetPlanDetailSuccess(true, "plan detail 정보조회 성공", plan, allDetail), HttpStatus.OK);
    }


    //2. 디테일 하나 조회하기
    @GetMapping("/getDetail/{detailId}")
    public ResponseEntity<GetDetailSuccess> getTranspotation (@PathVariable Long detailId){

        Object detail = detailService.getOneDetail(detailId);

        return new ResponseEntity<>(new GetDetailSuccess(true, "detail 조회 성공", detail), HttpStatus.OK);
    }

    //3. 디테일리스트 가져오기
    @GetMapping("/getAllDetail/{planId}")
    public ResponseEntity<GetAllDetailSuccess> getAllDetail(@PathVariable Long planId){

        List<Detail> allDetail = detailService.getAllDetail(planId);

        return new ResponseEntity<>(new GetAllDetailSuccess(true, "all detail 조회 성공", allDetail), HttpStatus.OK);
    }

    //4. 디테일 삭제하기
    @DeleteMapping("/deleteDetail/{detailId}")
    public ResponseEntity<Success> deleteDetail (@PathVariable Long detailId){
        detailService.deleteDetail(detailId);
        return new ResponseEntity<>(new Success(true, "detail 삭제 성공"), HttpStatus.OK);
    }

    /** Transpotation apis */
    //1. Transpotation 생성하기
    @PostMapping("/createTranspotation")
    public ResponseEntity<Success> createTranspotation(@RequestBody TranspotationSaveDto transpotationSaveDto){

        Position locationStart = new Position(transpotationSaveDto.getLocationStartLat(), transpotationSaveDto.getLocationStartLng());
        Position locationArrive = new Position(transpotationSaveDto.getLocationArriveLat(), transpotationSaveDto.getLocationArriveLng());

        transpotationSaveDto.setLocationStart(locationStart);
        transpotationSaveDto.setLocationArrive(locationArrive);

        detailService.saveTranspotation(transpotationSaveDto);

        return new ResponseEntity<>(new Success(true, "Transpotation 등록성공"), HttpStatus.OK);
    }

    //2. Transpotation 수정하기
    @PutMapping("/updateTranspotation/{detailId}")
    public ResponseEntity<Success> updateTranspotation(@PathVariable Long detailId, @RequestBody TranspotationSaveDto transpotationSaveDto){

        Position locationStart = new Position(transpotationSaveDto.getLocationStartLat(), transpotationSaveDto.getLocationStartLng());
        Position locationArrive = new Position(transpotationSaveDto.getLocationArriveLat(), transpotationSaveDto.getLocationArriveLng());

        transpotationSaveDto.setLocationStart(locationStart);
        transpotationSaveDto.setLocationArrive(locationArrive);

        detailService.updateTranspotation(detailId, transpotationSaveDto);

        return new ResponseEntity<>(new Success(true, "Transpotation 수정성공"), HttpStatus.OK);
    }

    /** Accommodation apis */
    //1. Accommodation 생성하기
    @PostMapping("/createAccommodation")
    public ResponseEntity<Success> createAccommodation(@RequestBody AccommodationSaveDto accommodationSaveDto){

        Position location = new Position(accommodationSaveDto.getLocationLat(), accommodationSaveDto.getLocationLng());

        accommodationSaveDto.setLocation(location);

        detailService.saveAccommodation(accommodationSaveDto);

        return new ResponseEntity<>(new Success(true, "Accommodation 등록성공"), HttpStatus.OK);
    }

    //2. Accommodation 수정하기
    @PutMapping("/updateAccommodation/{detailId}")
    public ResponseEntity<Success> updateAccommodation(@PathVariable Long detailId, @RequestBody AccommodationSaveDto accommodationSaveDto){

        Position location = new Position(accommodationSaveDto.getLocationLat(), accommodationSaveDto.getLocationLng());

        accommodationSaveDto.setLocation(location);

        detailService.updateAccommodation(detailId, accommodationSaveDto);

        return new ResponseEntity<>(new Success(true, "Accommodation 수정성공"), HttpStatus.OK);
    }
    /** Activity apis */
    //1. Activity 생성하기
    @PostMapping("/createActivity")
    public ResponseEntity<Success> createActivity(@RequestBody ActivitySaveDto activitySaveDto){

        Position location = new Position(activitySaveDto.getLocationLat(), activitySaveDto.getLocationLng());

        activitySaveDto.setLocation(location);

        detailService.saveActivity(activitySaveDto);

        return new ResponseEntity<>(new Success(true, "Activity 등록성공"), HttpStatus.OK);
    }

    //2. Activity 수정하기
    @PutMapping("/updateActivity/{detailId}")
    public ResponseEntity<Success> updateActivity(@PathVariable Long detailId, @RequestBody ActivitySaveDto activitySaveDto){

        Position location = new Position(activitySaveDto.getLocationLat(), activitySaveDto.getLocationLng());

        activitySaveDto.setLocation(location);

        detailService.updateActivity(detailId, activitySaveDto);

        return new ResponseEntity<>(new Success(true, "Activity 수정성공"), HttpStatus.OK);
    }
}
