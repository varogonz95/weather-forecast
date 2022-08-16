const ThemeProvider: React.FC<{ theme: string }> = (props) => (
    <link
        media='all'
        rel='stylesheet'
        href={`https://jenil.github.io/bulmaswatch/${props.theme}/bulmaswatch.min.css`}
    />
);

export default ThemeProvider;
