import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import HttpService from '../../services/http';

export const SignIn = () => {
    const [phone, setphone] = useState<string | null>(null);
    const [password, setPassword] = useState<string>("");
    const [isPasswordShow, setIsPasswordShow] = useState<Boolean>(false);
    const navigate = useNavigate();

    const subimitHandler = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response: any = await HttpService.signIn({
                phone: phone?.trim(),
                password: password.trim(),
                deviceId: "12345678911"
            });

            if (response.data.user.role == "user") {
                return toast.error("Login with admin credentials!");
            }

            localStorage.setItem("jwt", response.data.jwt);
            toast.success("Welcome to MONEYMATT.");
            navigate("/");
        }
        catch (error: any) {
            toast.error(error.response.data.message);
        }
    }
    
    return (
        <div className="register-area">
            <div className="register-area-wrap">
                <div className="register-left">
                    <div className="register-form">
                        <h3 className="form-title">Welcome to Moneymatt</h3>
                        <form onSubmit={subimitHandler}>
                            <div className="form-group">
                                <label htmlFor="email">Phone</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="phone"
                                    name="phone"
                                    required
                                    onChange={(e) => setphone(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password-field">Password</label>
                                <input
                                    id="password-field"
                                    type={isPasswordShow ? "text" : "password"}
                                    className="form-control"
                                    name="password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span
                                    onClick={() => setIsPasswordShow(!isPasswordShow)}
                                    className="fa fa-fw fa-eye field-icon toggle-password"
                                ></span>
                            </div>
                            <button type="submit" className="register-btn-primary" >
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
                <div className="register-right">
                    <div className="register-image">
                        <img src={require("../../assets/images/sign-in-image.png")} alt="sing up " />
                    </div>
                </div>
            </div>
        </div>
    )
}
