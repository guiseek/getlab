import {Observable, map, merge, BehaviorSubject} from 'rxjs'
import {MatPaginator} from '@angular/material/paginator'
import {DataSource} from '@angular/cdk/collections'
import {MatSort} from '@angular/material/sort'
import {Preview} from '../../shared/interfaces'

export class PreviewDataSource extends DataSource<Preview> {
  #data = new BehaviorSubject<Preview[]>([])
  data$ = this.#data.asObservable()

  // data: Preview[] = EXAMPLE_DATA
  paginator: MatPaginator | undefined
  sort: MatSort | undefined

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Preview[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(this.data$, this.paginator.page, this.sort.sortChange).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.#data.value]))
        })
      )
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      )
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Preview[]): Preview[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize
      return data.splice(startIndex, this.paginator.pageSize)
    } else {
      return data
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Preview[]): Preview[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc'
      switch (this.sort?.active) {
        case 'name':
          return compare(a.name, b.name, isAsc)
        case 'id':
          return compare(+a.id, +b.id, isAsc)
        default:
          return 0
      }
    })
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1)
}
