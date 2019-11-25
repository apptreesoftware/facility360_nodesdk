import {UsernamePasswordCredential} from "../auth";
import {FamisClient} from "../famis_client";
import {QueryContext} from "../model/request_context";

describe('Attachments', () => {
    it('should fetch all attachments', async function() {
        const user = process.env.UNIT_TEST_USER as string;
        const psswd = process.env.UNIT_TEST_PSSWD as string;
        const baseUrl = process.env.UNIT_TEST_BASE_URL as string;

        if (!user || !psswd || !baseUrl) {
            fail("environment variables aren't set");
        }
        const credential = new UsernamePasswordCredential(user, psswd, baseUrl);
        const famisClient = new FamisClient(credential, baseUrl, true);

        const resp = await famisClient.getAttachments(new QueryContext());
        expect(resp).toBeTruthy();
        expect(resp.results).toBeTruthy();
        expect(resp.results.length).toBeGreaterThan(1000);
    })
});

describe('Lists', () => {
    const user = process.env.UNIT_TEST_USER as string;
    const psswd = process.env.UNIT_TEST_PSSWD as string;
    const baseUrl = process.env.UNIT_TEST_BASE_URL as string;

    if (!user || !psswd || !baseUrl) {
        fail("environment variables aren't set");
    }
    const credential = new UsernamePasswordCredential(user, psswd, baseUrl);
    const famisClient = new FamisClient(credential, baseUrl, true);

    const baseContext = new QueryContext();

    it('should fetch all account segments', async function() {
        const resp = await famisClient.getAccountSegments(baseContext);
        expect(resp).toBeTruthy();
        expect(resp.results).toBeTruthy();
        expect(resp.results.length).toBe(6);
    });

    it('should fetch all activity groups', async function () {
        const resp = await famisClient.getActivityGroups(baseContext);
        expect(resp).toBeTruthy();
        expect(resp.results).toBeTruthy();
        expect(resp.results.length).toBe(5);
    });

    it('should fetch all asset classes', async function () {
        const resp = await famisClient.getAssetClasses(baseContext);
        expect(resp).toBeTruthy();
        expect(resp.results).toBeTruthy();
        expect(resp.results.length).toBe(144);
    });

    it('should fetch all asset keywords', async function () {
        const resp = await famisClient.getAssetKeywords(baseContext);
        expect(resp).toBeTruthy();
        expect(resp.results).toBeTruthy();
        expect(resp.results.length).toBe(217);
    });

    it('should fetch asset with id 2575', async function () {
        const context = new QueryContext().setFilter('Id eq 2575');
        const resp = await famisClient.getAssets(context);
        expect(resp).toBeTruthy();
        expect(resp.results).toBeTruthy();
        expect(resp.results.length).toBe(1);
    });

    it('should fetch all spaces', async function () {
        const resp = await famisClient.getSpaces(new QueryContext().setFilter('PropertyId eq 187'));
        expect(resp).toBeTruthy();
        expect(resp.results).toBeTruthy();
        expect(resp.results.length).toBe(276);
    });

    it('should fetch work orders based on filter', async function () {
        const context = new QueryContext().setFilter('Id eq 3').setExpand('Attachments');
        const resp = await famisClient.getWorkOrders(context);
        expect(resp).toBeTruthy();
        expect(resp.results).toBeTruthy();
        expect(resp.results.length).toBe(1);
        const attachments = resp.results[0].Attachments;
        expect(attachments).toBeTruthy();
        expect(attachments ? attachments.length : 0).toBe(1);
    });
});