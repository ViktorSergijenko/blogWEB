import { Component, OnInit } from '@angular/core';
import { GlobalAdminRegionService } from './global-admin-region.service';
import { finalize } from 'rxjs/operators';
import { Region } from './region-model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-global-admin-regions',
  templateUrl: './global-admin-regions.component.html',
  styleUrls: ['./global-admin-regions.component.scss']
})
export class GlobalAdminRegionsComponent implements OnInit {
  initialLoading = true;
  asd: Region = new Region();
  regionList: Region[] = [];
  dataSource = new MatTableDataSource(this.regionList);

  error: string = '';
  displayedColumns: string[] = ['regionName', 'differenceInHoursTime', 'id', 'actions'];
  constructor(private adminRegionService: GlobalAdminRegionService) {}

  ngOnInit() {
    this.getRegions();
  }

  edit(region: Region) {
    console.log(region);
    this.regionList.push(region);
    this.dataSource = new MatTableDataSource(this.regionList);
  }
  getRegions() {
    this.adminRegionService
      .getRegionList()
      .pipe(
        finalize(() => {
          this.initialLoading = false;
        })
      )
      .subscribe(
        regions => {
          this.regionList = regions;
          this.dataSource = new MatTableDataSource(this.regionList);
        },
        err => {
          this.error = err;
        }
      );
  }
}
