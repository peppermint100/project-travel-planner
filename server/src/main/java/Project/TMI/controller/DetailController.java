package Project.TMI.controller;

import Project.TMI.domain.PlanDetail.Detail;
import Project.TMI.domain.PlanDetail.Position;
import Project.TMI.dto.TranspotationSaveDto;
import Project.TMI.model.GetAllDetailSuccess;
import Project.TMI.model.GetDetailSuccess;
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
    //1. 디테일 하나 조회하기
    @GetMapping("/getDetail/{detailId}")
    public ResponseEntity<GetDetailSuccess> getTranspotation (@PathVariable Long detailId){

        Object detail = detailService.getOneDetail(detailId);

        return new ResponseEntity<>(new GetDetailSuccess(true, "detail 조회 성공", detail), HttpStatus.OK);
    }

    //2. 디테일리스트 가져오기
    @GetMapping("/getAllDetail/{planId}")
    public ResponseEntity<GetAllDetailSuccess> getAllDetail(@PathVariable Long planId){

        List<Detail> allDetail = detailService.getAllDetail(planId);

        return new ResponseEntity<>(new GetAllDetailSuccess(true, "all detail 조회 성공", allDetail), HttpStatus.OK);
    }

    //3. 디테일 삭제하기
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
}
