import {Staff} from "./staff";

export class RequestActivity {
    activity_uuid: string;
    request_uuid: string;
    staff_uuid: string;
    activity_detail: string;
    activity_created_datetime: string;
    activity_updated_datetime: string;
    staff: Staff;
}
