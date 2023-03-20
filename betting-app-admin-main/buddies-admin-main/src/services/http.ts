import axios from "axios";
export { };

class HttpService {
    static getHeader(): { Authorization: string } {
        return {
            Authorization: "Bearer " + localStorage.getItem("jwt")
        }
    }

    static baseUrl() {
        return "http://13.127.222.82:3000/api/v1";
        // return "http://localhost:3000/api/v1";
    }


    static async signIn(body: any) {
        const response = await axios({
            method: "Post",
            url: `${this.baseUrl()}/auth/signIn`,
            headers: this.getHeader(),
            data: body
        });

        return response.data;
    }

    static async getHistory() {
        const response = await axios({
            method: "Get",
            url: `${this.baseUrl()}/result/all`,
            headers: this.getHeader()
        });

        return response.data.data!;
    }

    static async getUsers() {
        const response = await axios({
            method: "Get",
            url: `${this.baseUrl()}/user/users`,
            headers: this.getHeader()
        });

        return response.data.data!;
    }

    static async getQuereis() {
        const response = await axios({
            method: "Get",
            url: `${this.baseUrl()}/query/all`,
            headers: this.getHeader()
        });

        return response.data.data!;
    }

    static async queryStatusUpdate(queryId: string) {
        const response = await axios({
            method: "Patch",
            url: `${this.baseUrl()}/query/status?queryId=${queryId}`,
            headers: this.getHeader()
        });

        return response.data.data!;
    }

    static async getPricePercentage() {
        const response = await axios({
            method: "Get",
            url: `${this.baseUrl()}/pricePer`,
            headers: this.getHeader()
        });

        return response.data.data!;
    }

    static async getYantraPricePercentage() {
        const response = await axios({
            method: "Get",
            url: `${this.baseUrl()}/yantraPricePer`,
            headers: this.getHeader()
        });

        return response.data.data!;
    }

    static async updatePricePercentage(giveAwayPer: number) {
        const response = await axios({
            method: "Post",
            url: `${this.baseUrl()}/pricePer`,
            headers: this.getHeader(),
            data: { giveAwayPer }
        });

        return response.data.data!;
    }

    static async updateYantraPricePercentage(giveAwayPer: number) {
        const response = await axios({
            method: "Post",
            url: `${this.baseUrl()}/yantraPricePer`,
            headers: this.getHeader(),
            data: { giveAwayPer }
        });

        return response.data.data!;
    }

    static async getCurrentPeriod(game: string) {
        const response = await axios({
            method: "Get",
            url: `${this.baseUrl()}/result/currentPeriod/?game=${game}`,
            headers: this.getHeader(),
        });

        return response.data.data!;
    }

    static async getCurrentYantraPeriod() {
        const response = await axios({
            method: "Get",
            url: `${this.baseUrl()}/yantraResult/currentPeriod`,
            headers: this.getHeader(),
        });

        return response.data.data!;
    }

    static async getCurrentEstimatedResult(period: number) {
        const response = await axios({
            method: "Get",
            url: `${this.baseUrl()}/result/currentResult?period=${period}`,
            headers: this.getHeader(),
        });

        return response.data.data!;
    }

    static async getCurrentEstimatedYantraResult(period: number) {
        const response = await axios({
            method: "Get",
            url: `${this.baseUrl()}/yantraResult/currentResult?period=${period}`,
            headers: this.getHeader(),
        });

        return response.data.data!;
    }

    static async setResult(data: any) {
        const response = await axios({
            method: "Post",
            url: `${this.baseUrl()}/result/setResult`,
            headers: this.getHeader(),
            data
        });

        return response.data.data!;
    }

    static async setYantraResult(data: any) {
        const response = await axios({
            method: "Post",
            url: `${this.baseUrl()}/yantraResult/setResult`,
            headers: this.getHeader(),
            data
        });

        return response.data.data!;
    }

    static async getDashboardData() {
        const response = await axios({
            method: "Get",
            url: `${this.baseUrl()}/result/dashboardData`,
            headers: this.getHeader(),
        });

        return response.data.data!;
    }

    static async getYantraDashboardData() {
        const response = await axios({
            method: "Get",
            url: `${this.baseUrl()}/yantraResult/dashboardData`,
            headers: this.getHeader(),
        });

        return response.data.data!;
    }

    static async getUserReferals(phone: string) {
        const response = await axios({
            method: "Get",
            url: `${this.baseUrl()}/referals?phone=${phone}`,
            headers: this.getHeader(),
        });

        return response.data.data!;
    }

    static async getTransactionsReq() {
        const response = await axios({
            method: "Get",
            url: `${this.baseUrl()}/payment/all`,
            headers: this.getHeader()
        });

        return response.data.data!;
    }

    static async getWithdrawalReqs() {
        const response = await axios({
            method: "Get",
            url: `${this.baseUrl()}/withdrawal/all`,
            headers: this.getHeader()
        });

        return response.data.data!;
    }

    static async verifyTransaction(data: any) {
        const response = await axios({
            method: "Post",
            url: `${this.baseUrl()}/payment/verify`,
            headers: this.getHeader(),
            data
        });

        return response.data.data!;
    }

    static async verifyWithdraw(data: any) {
        const response = await axios({
            method: "Post",
            url: `${this.baseUrl()}/withdrawal/verify`,
            headers: this.getHeader(),
            data
        });

        return response.data.data!;
    }

    static async getAccountInfo() {
        const response = await axios({
            method: "Get",
            url: `${this.baseUrl()}/account`,
            headers: this.getHeader()
        });

        return response.data.data!;
    }

    static async accountUpdate(body: any) {
        const {
            data: { data },
        } = await axios({
            method: 'Patch',
            url: `${this.baseUrl()}/account`,
            headers: this.getHeader(),
            data: body,
        });

        return data;
    }

    static async me() {
        const response = await axios({
            method: "Get",
            url: `${this.baseUrl()}/user/me`,
            headers: this.getHeader()
        });

        return response.data.data!;
    }

    static async getReferEarn() {
        const response = await axios({
            method: "Get",
            url: `${this.baseUrl()}/referEarnAmount`,
            headers: this.getHeader()
        });

        return response.data.data!;
    }

    static async setReferEarn(body: any) {
        const {
            data: { data },
        } = await axios({
            method: 'Patch',
            url: `${this.baseUrl()}/referEarnAmount`,
            headers: this.getHeader(),
            data: body,
        });

        return data;
    }
}

export default HttpService;