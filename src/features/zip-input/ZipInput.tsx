import React from 'react';

type ButtonEvent = React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>;

interface IZipInputProps {
    errors?: string[];
    loading?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
    onClick?: (e: ButtonEvent) => any;
}

export default class ZipInput extends React.Component<IZipInputProps> {
    private btnClasses = ['button', 'is-info'];

    constructor(props: IZipInputProps) {
        super(props);
    }

    public render() {
        const { errors, loading, onChange, onClick } = this.props;
        return (
            <div className='field is-grouped'>
                <div className='control is-expanded'>
                    <input
                        className='input'
                        type='number'
                        placeholder='Please enter a ZIP code'
                        disabled={loading}
                        onChange={(e) => {
                            onChange(e);
                        }}
                    />
                    {errors &&
                        errors.map((error, i) => (
                            <p key={i} className='help is-danger'>
                                {error}
                            </p>
                        ))}
                </div>
                <div className='control'>
                    <button
                        className={[...this.btnClasses, loading && 'is-loading'].join(' ')}
                        type='button'
                        disabled={loading}
                        onClick={onClick}
                    >
                        Submit
                    </button>
                </div>
            </div>
        );
    }
}
