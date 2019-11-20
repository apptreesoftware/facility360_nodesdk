import {UsernamePasswordCredential} from "../auth";
import {FamisClient} from "../famis_client";
import {QueryContext} from "../model/request_context";
import {CreateAssetModel} from "../model/assets";

describe('Attachments', () => {
    it('should fetch all attachments', async function() {
        const user = process.env.UNIT_TEST_USER as string;
        const psswd = process.env.UNIT_TEST_PSSWD as string;
        const baseUrl = process.env.UNIT_TEST_BASE_URL as string;

        if (!user || !psswd || !baseUrl) {
            fail("environment variables aren't set");
        }
        const credential = new UsernamePasswordCredential(user, psswd, baseUrl);
        const famisClient = new FamisClient(credential, baseUrl);

        const attachments = await famisClient.getAttachments(new QueryContext());
        expect(attachments).toBeTruthy();
        expect(attachments.length).toBeGreaterThan(1000);
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
    const famisClient = new FamisClient(credential, baseUrl);

    const baseContext = new QueryContext();

    it('should fetch all account segments', async function() {
        const accountSegments = await famisClient.getAccountSegments(baseContext);
        expect(accountSegments).toBeTruthy();
        expect(accountSegments.length).toBe(6);
    });

    it('should fetch all activity groups', async function () {
        const actvityGroups = await famisClient.getActivityGroups(baseContext);
        expect(actvityGroups).toBeTruthy();
        expect(actvityGroups.length).toBe(5);
    });

    it('should fetch all asset classes', async function () {
        const assetClasses = await famisClient.getAssetClasses(baseContext);
        expect(assetClasses).toBeTruthy();
        expect(assetClasses.length).toBe(144);
    });

    it('should fetch all asset keywords', async function () {
        const assetKeywords = await famisClient.getAssetKeywords(baseContext);
        expect(assetKeywords).toBeTruthy();
        expect(assetKeywords.length).toBe(217);
    });

    it('should fetch asset with id 2575', async function () {
        const context = new QueryContext().setFilter('Id eq 2575');
        const assets = await famisClient.getAssets(context);
        expect(assets).toBeTruthy();
        expect(assets.length).toBe(1);
    });

    it('should fetch all spaces', async function () {
        const spaces = await famisClient.getSpaces(new QueryContext().setFilter('PropertyId eq 187'));
        expect(spaces).toBeTruthy();
        expect(spaces.length).toBe(276);
    });

    it('should fetch work orders based on filter', async function () {
        const context = new QueryContext().setFilter('Id eq 3').setExpand('Attachments');
        const workOrders = await famisClient.getWorkOrders(context);
        expect(workOrders).toBeTruthy();
        expect(workOrders.length).toBe(1);
        const attachments = workOrders[0].Attachments;
        expect(attachments).toBeTruthy();
        expect(attachments ? attachments.length : 0).toBe(1);
    });

    it('should create an asset model and return it', async function () {
       const toCreate: CreateAssetModel = {
           ActiveFlag: true,
           Description: "Testing, please ignore",
           MakeId: 951
        };

       const asset = await famisClient.createAssetModel(toCreate);
       expect(asset).toBeTruthy();
       expect(asset.Description).toBe("Testing, please ignore");
    });
});