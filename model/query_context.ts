export class QueryContext {
    filter?: string;
    expand?: string;
    select?: string;

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

    buildUrl(entity: string) {
        let urlPath = `${basePath}/${entity}`;
        let hasQuery = false;
        if (this.filter) {
           urlPath += `${hasQuery ? '&' : '?'}$filter=${this.filter}`;
        }
        if (this.expand) {
            urlPath += `${hasQuery ? '&' : '?'}$expand=${this.expand}`;
        }
        if (this.select) {
            urlPath += `${hasQuery ? '&' : '?'}$select=${this.select}`;
        }
        return urlPath;
    }

    buildPagedUrl(entity: string, top: number, skip: number) {
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
        return urlPath;
    }
}

export const basePath = 'MobileWebServices/apis/360facility/v1'