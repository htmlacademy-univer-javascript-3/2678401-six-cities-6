export default function Spinner(): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        minHeight: '400px',
      }}
    >
      <div
        style={{
          width: '20px',
          height: '20px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #ff6b6b',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
