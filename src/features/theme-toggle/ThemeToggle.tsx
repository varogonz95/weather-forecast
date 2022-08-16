import React from 'react';
import './ThemeToggle.scss';

interface IThemeToggleProps {
    id?: string;
    name: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
}

export default class ThemeToggle extends React.Component<IThemeToggleProps> {
    constructor(props: IThemeToggleProps) {
        super(props);
    }

    public render() {
        const { id, name, onChange } = this.props;
        return (
            <div className='toggle-switch'>
                <input
                    id={id || name}
                    name={name}
                    type='checkbox'
                    className='toggle-switch-checkbox'
                    onChange={(e) => onChange(e)}
                    defaultChecked
                />
                <label className='toggle-switch-label' htmlFor={name}>
                    <span className='toggle-switch-inner' />
                    <span className='toggle-switch-switch' />
                </label>
            </div>
        );
    }
}
