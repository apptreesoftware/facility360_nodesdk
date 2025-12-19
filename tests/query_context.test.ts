import {QueryContext} from "../model/request_context";

describe('QueryContext', function () {
    it('should include select statement', function () {
        const context = new QueryContext().setSelect("Id,Name");
        const queryUrl = context.buildUrl("/test");
        const fullUrl = `http://example.com/${queryUrl}`;
        const uri = new URL(fullUrl);
        const select = uri.searchParams.get("$select");
        expect(select).toEqual("Id,Name")
    });
    it('should include expand', function () {
        const context = new QueryContext().setExpand("Id,Name");
        const queryUrl = context.buildUrl("/test");
        const fullUrl = `http://example.com/${queryUrl}`;
        const uri = new URL(fullUrl);
        const select = uri.searchParams.get("$expand");
        expect(select).toEqual("Id,Name")
    });
    it('should include expand', function () {
        const context = new QueryContext().setFilter("Name eq 'Joe'");
        const queryUrl = context.buildUrl("/test");
        const fullUrl = `http://example.com/${queryUrl}`;
        const uri = new URL(fullUrl);
        const select = uri.searchParams.get("$filter");
        expect(select).toEqual("Name eq 'Joe'")
    });
});