export class QueryContext {
    filter?: string;
    expand?: string;
    select?: string;
    top?: number;
    skip?: number;
    orderBy?: string;

    setFilter(filter : string) {
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

    buildUrl(entity: string) {
        let urlPath = `${basePath}/${entity}`;
        let hasQuery = false;
        if (this.filter) {
           urlPath += `${hasQuery ? '&' : '?'}$filter=${this.filter}`;
           hasQuery = true
        }
        if (this.expand) {
            urlPath += `${hasQuery ? '&' : '?'}$expand=${this.expand}`;
            hasQuery = true
        }
        if (this.select) {
            urlPath += `${hasQuery ? '&' : '?'}$select=${this.select}`;
            hasQuery = true
        }
        if (this.top) {
            urlPath += `${hasQuery ? '&' : '?'}$top=${this.top}`;
            hasQuery = true
        }
        if (this.skip) {
            urlPath += `${hasQuery ? '&' : '?'}$skip=${this.skip}`;
            hasQuery = true
        }
        if (this.orderBy) {
            urlPath += `${hasQuery ? '&' : '?'}$orderby=${this.orderBy}`;
        }
        return urlPath;
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
            urlPath += "&$count=true"
        }
        return urlPath;
    }
}

export function buildEntityUrl(entity: string): string {
    return `${basePath}/${entity}`;
}

export const basePath = 'MobileWebServices/apis/360facility/v1';