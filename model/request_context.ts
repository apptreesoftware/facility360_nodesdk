export class QueryContext {
  filter?: string;
  expand?: string;
  select?: string;
  top?: number;
  skip?: number;
  orderBy?: string;

  setFilter(filter: string) {
    this.filter = filter;
    return this;
  }

  setExpand(expand: string) {
    this.expand = expand;
    return this;
  }

  setSelect(select: string) {
    this.select = select;
    return this;
  }

  setTop(top: number) {
    this.top = top;
    return this;
  }

  setSkip(skip: number) {
    this.skip = skip;
    return this;
  }

  setOrderBy(orderBy: string) {
    this.orderBy = orderBy;
    return this;
  }

  buildApiUrl(entity: string) {
    let urlPath = `MobileWebServices/api/${entity}`;
    return this.addFiltersToUrl(urlPath);
  }

  buildUrl(entity: string) {
    return this.addFiltersToUrl(`${basePath}/${entity}`);
  }

  buildPagedUrl(entity: string, top: number, skip: number, count: boolean = false) {
    let urlPath = `${basePath}/${entity}?$top=${top}&$skip=${skip}`;
    if (this.filter) {
      urlPath += `&$filter=${this.filter}`;
    }
    if (this.expand) {
      urlPath += `&$expand=${this.expand}`;
    }
    if (this.select) {
      urlPath += `&$select=${this.select}`;
    }
    if (this.orderBy) {
      urlPath += `&$orderby=${this.orderBy}`;
    }
    if (count) {
      urlPath += '&$count=true';
    }
    return urlPath;
  }

  addFiltersToUrl(path: string) {
    let urlPath = path;
    let hasQuery = false;
    if (this.filter) {
      urlPath += `${hasQuery ? '&' : '?'}$filter=${this.filter}`;
      hasQuery = true;
    }
    if (this.expand) {
      urlPath += `${hasQuery ? '&' : '?'}$expand=${this.expand}`;
      hasQuery = true;
    }
    if (this.select) {
      urlPath += `${hasQuery ? '&' : '?'}$select=${this.select}`;
      hasQuery = true;
    }
    if (this.top) {
      urlPath += `${hasQuery ? '&' : '?'}$top=${this.top}`;
      hasQuery = true;
    }
    if (this.skip) {
      urlPath += `${hasQuery ? '&' : '?'}$skip=${this.skip}`;
      hasQuery = true;
    }
    if (this.orderBy) {
      urlPath += `${hasQuery ? '&' : '?'}$orderby=${this.orderBy}`;
    }
    return urlPath;
  }

  copyFromOther(other: QueryContext): QueryContext {
    this.expand = other.expand;
    this.orderBy = other.orderBy;
    this.select = other.select;
    this.filter = other.filter;
    this.top = other.top;
    this.skip = other.skip;
    return this;
  }
}

export function buildEntityUrl(entity: string): string {
  return `${basePath}/${entity}`;
}

export const basePath = 'MobileWebServices/apis/360facility/v1';
