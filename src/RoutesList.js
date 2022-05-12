

function RoutesList({ login, signup, currentUser }) {
  return (
    <div className="pt-5">
      <Routes>
        {!currentUser &&
          <>
            <Route path="/login" element={<LoginForm login={login} />} />
            <Route path="/signup" element={<SignupForm signup={signup} />} />
          </>
        }

        <Route path="/" element={<Homepage />} />

        {currentUser &&
          <>
            <Route path="/companies" element={<CompanyList />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/companies/:handle" element={<CompanyDetail />} />
            <Route path="/profile" element={<ProfileForm />} />

          </>
        }

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
